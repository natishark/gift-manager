import { useState, useTransition } from "react";

import SortIcon from '../../resources/icons/companyDistribution/magic-sort.svg';
import ClearIcon from '../../resources/icons/companyDistribution/clear.svg';
import SettingsIcon from '../../resources/icons/companyDistribution/settings.svg';

import { Header } from "../Header/Header";
import { ModalDistributionCreator } from "../ModalDistributionCreator/ModalDistributionCreator";
import { DistributionGallery } from "../DistributionGallery/DistributionGallery";
import { Page } from "../Page/Page";
import { GiftMap } from "../../model/giftMap";
import { RgbColor } from "../../utils/color/RgbColor";
import { SettingsContextProvider } from "../../context/SettingsContext/SettingsContext";
import { useTranslation } from "react-i18next";

const State = { START: "start", CREATE_COMPANY: "createCompany", WORK: "work" };

const aggregationFunction = (rates) => rates.reduce((sum, cur) => sum + cur, 0) / rates.length;

const compareFunction = (a, b) => {
  return GiftMap.getAggregatedRate(b, aggregationFunction) - 
    GiftMap.getAggregatedRate(a, aggregationFunction);
};

export default function Draft() {
  const { t, i18n } = useTranslation();
  /** What is going to be in settings?
         * - Rating theme
         * - Rating number
         * - Default rating
         * - Currency
         * - Aggregation function: mean or min?
         * - Language (default - system::: read)
         * - Show or not rating numbers
         * - Store or not in browser
         * - Font size: normal or big
         */
  const [settings, setSettings] = useState({
    ratingTheme: {
      bestOptionColor: new RgbColor(107, 255, 84),
      worstOptionColor: new RgbColor(255, 176, 120)
    },
    ratingNumber: 5,
    defaultRating: 2,
    currency: ' руб',
    aggregationFunction: aggregationFunction,
    language: 'en',
    showRatingValues: false,
    storeInBrowser: false,
    fontSize: 'normal',
  });

  const [giftMapList, setGiftMapList] = useState(null);
  const [appState, setAppState] = useState(State.START);
  const [personList, setPersonList] = useState(null);

  function handleDistributionCreation(personList) {
    setPersonList(personList);
    setGiftMapList([new GiftMap(personList)])
    setAppState(State.WORK);
  }

  function handleSort() {
    setGiftMapList(
      [...giftMapList].sort(compareFunction)
    );
  }

  function handleAddDistribution() {
    setGiftMapList([...giftMapList, new GiftMap(personList)]);
  }

  const workSpecificHeaderButtons = () => (
    <>
      <button 
        className='icon' 
        title={t('icon.title.sort')}
        onClick={handleSort}
      >
        <img src={SortIcon} alt={t('icon.alt.sort')}></img>
      </button>
      <button className='icon' title={t('icon.title.clear')}>
        <img src={ClearIcon} alt={t('icon.alt.clear')}></img>
      </button>
    </>
  );

  return (
    <Page>
      <Header>
        {appState === State.WORK && workSpecificHeaderButtons()}
        <button className='icon'>
          <img src={SettingsIcon} alt={t('icon.alt.settings')}></img>
        </button>
      </Header>
      <SettingsContextProvider value={settings}>
        {appState === State.WORK ? 
          <DistributionGallery 
            giftMapList={giftMapList} 
            setGiftMapList={setGiftMapList}
            onAddDistribution={handleAddDistribution} 
          /> :
          <button className="ui-button" onClick={() => setAppState(State.CREATE_COMPANY)}>
            {t('button.name.createCompany')}
          </button>
        }
      </SettingsContextProvider>
      <ModalDistributionCreator 
        isOpen={appState === State.CREATE_COMPANY}
        onConfirm={handleDistributionCreation}
      />
    </Page>
  );
}
