import './DistributionGallery.css';

import { CompanyDistribution } from "../CompanyDistribution/CompanyDistribution";

import { 
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { 
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove
} from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';

export function DistributionGallery({ giftMapList, setGiftMapList, onAddDistribution }) {
  const { t } = useTranslation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  function handleGiftMapUpdate(newGiftMap) {
    const index = giftMapList.findIndex(giftMap => giftMap.id === newGiftMap.id);
    setGiftMapList([
      ...giftMapList.slice(0, index),
      newGiftMap,
      ...giftMapList.slice(index + 1)
    ]);
  }

  function handleDragEnd({ active, over }) {
    if (active.id !== over.id) {
      setGiftMapList((giftMapList) => {
        const activeIndex = giftMapList.findIndex(giftMap => giftMap.id === active.id);
        const overIndex = giftMapList.findIndex(giftMap => giftMap.id === over.id);
        
        return arrayMove(giftMapList, activeIndex, overIndex);
      });
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={giftMapList.map(gm => gm.id)}
          strategy={rectSortingStrategy}
        >
          <div className="slider-container">
            {giftMapList.map(giftMap => <CompanyDistribution 
              key={giftMap.id}
              giftMap={giftMap}
              onChange={handleGiftMapUpdate}
            />)}
          </div>
        </SortableContext>
      </DndContext>
      <button tabIndex={0} className="new-distribution-btn" onClick={onAddDistribution}>
        {t('button.name.add')}
      </button>
    </>
  )
}
