import './CompanyDistribution.css';

import { GiftMap } from "../../model/giftMap";
import { PersonGifts } from '../../model/personGifts';
import { PersonGiftsMatch } from "../PersonGiftsMatch/PersonGiftsMatch";
import { getColorByRate } from '../../utils/color/colorRatingSystem';

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { 
  useSortable,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

import { giftMapToPdf } from '../../pdf/giftMapToPdf';
import { useSettingsContext } from '../../context/SettingsContext/SettingsContext';

const fileName = 'gifts-for-all';

export function CompanyDistribution({ giftMap, onChange }) {
  const settingsContext = useSettingsContext();

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id: giftMap.id });

  function handlePersonGiftsUpdate(personGifts) {
    onChange({
      ...giftMap,
      personGiftMap: {
        ...giftMap.personGiftMap,
        [personGifts.id]: personGifts
      }
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // // TODO: delete
  // useEffect(() => {
  //   onChange({
  //     ...giftMap,
  //     personGiftMap: {
  //       'pg-1': {
  //         id: 'pg-1',
  //         person: 'Mike',
  //         rate: 2,
  //         gifts: [
  //           {name: "Orange", link: "http://he", price: 555, id: nanoid()}, 
  //           {name: "Kek", price: 122, id: nanoid()}
  //         ]
  //       },
  //       'pg-2': {
  //         id: 'pg-2',
  //         person: 'Luke',
  //         rate: 0,
  //         gifts: [
  //           {name: "Apple", link: "http://he", price: 1, id: nanoid()}, 
  //           {name: "Gum", link: "http://he", price: 8473, id: nanoid()}
  //         ]
  //       },
  //       'pg-3': {
  //         id: 'pg-3',
  //         person: 'Kate',
  //         rate: 4,
  //         gifts: [
  //           {name: "Eyeshadow", price: 111111, id: nanoid()}
  //         ]
  //       },
  //     }
  //   });
  // }, []);

  function handleDragOver({ active, over }) {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || overId;

    if (activeContainer !== overContainer) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      onChange({
        ...giftMap,
        personGiftMap: moveBetweenContainers(
          giftMap.personGiftMap,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          giftMap.personGiftMap[activeContainer].gifts[activeIndex]
        )
      });
    }
  }

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    const activeIndex = active.data.current.sortable.index;
    const overIndex = over.data.current?.sortable.index || 0;

    onChange({
      ...giftMap,
      personGiftMap: activeContainer === overContainer ? {
        ...giftMap.personGiftMap,
        [overContainer]: PersonGifts.arrayMove(
          giftMap.personGiftMap[overContainer],
          activeIndex,
          overIndex
        )
      } : moveBetweenContainers(
        giftMap.personGiftMap,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        giftMap.personGiftMap[activeContainer].gifts[activeIndex]
      )
    });
  }

  function onDownload() {
    giftMapToPdf(giftMap, settingsContext.currency).download(fileName);
  }

  return (
    <section 
      className="company-card"
      style={{
        backgroundColor: getColorByRate(
          settingsContext.ratingTheme,
          GiftMap.getAggregatedRate(giftMap, settingsContext.aggregationFunction),
          settingsContext.ratingNumber
        ),
        transform: CSS.Translate.toString(transform),
        transition,
      }}
      ref={setNodeRef}
      id={giftMap.id}
    >
      <nav>
        <button onClick={onDownload}>Save PDF</button>
        <button>Dublicate</button>
        <button>Delete</button>
        <button 
          {...listeners}
          {...attributes}
        >
          Grab
        </button>
      </nav>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="persons-gifts-section">
          {Object.values(giftMap.personGiftMap).map(personGifts => {
            console.log("CompanyDistribution, somewhere inside map")
            console.log("personGifts")
            console.log(personGifts)
            return (
            
            <PersonGiftsMatch
              className='person-gifts-match'
              key={personGifts.id} 
              id={personGifts.id}
              personGifts={personGifts}
              onUpdate={handlePersonGiftsUpdate}
            />
          )})}
        </div>
      </DndContext>
      <p>Total price: {GiftMap.getTotalPrice(giftMap)}{settingsContext.currency}</p>
    </section>
  )
}

function moveBetweenContainers(
  personGiftMap,
  activeContainer,
  activeIndex,
  overContainer,
  overIndex,
  gift
) {
  return {
    ...personGiftMap,
    [activeContainer]: PersonGifts.removeGiftByIndex(personGiftMap[activeContainer], activeIndex),
    [overContainer]: PersonGifts.insertGiftByIndex(personGiftMap[overContainer], overIndex, gift)
  };
};
