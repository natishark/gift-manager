import { useState } from "react";
import { ModalDialog } from "../tools/ModalDialog/ModalDialog";
import { useTranslation } from "react-i18next";

export function ModalDistributionCreator({ isOpen, onConfirm }) {
  const { t } = useTranslation();

  const [input, setInput] = useState("");

  function handleModalConfirm() {
    onConfirm(input.split(",").map(name => name.trim()));
    console.log("ModalDistributionCreator, handleModalConfirm, input...")
    console.log(input)
    setInput("");
  }

  return (
    <ModalDialog isOpen={isOpen}>
      <div className="modal-create-distribution">
        <label htmlFor="person-list">
          {t('ModalDistributionCreator.title')}
        </label>
        <input 
          type="text" 
          id="person-list" 
          name="person-list" 
          placeholder={t('ModalDistributionCreator.placeholder')}
          value={input}
          onChange={e => setInput(e.target.value)}
          required 
        />
        <button onClick={handleModalConfirm}>
          {t('ModalDistributionCreator.confirm')}
        </button>
      </div>
    </ModalDialog>
  )
}
