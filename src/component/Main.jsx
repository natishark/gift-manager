// import { useState } from "react";
// import { nanoid } from 'nanoid';

// import { GiftOption } from "./GiftOption";


// import { CompanyDistribution } from "./CompanyDistribution";
// import { ModalDistributionCreator } from "./ModalDistributionCreator";

// export function Main() {
//   const [personLists, setPersonLists] = useState([]);
//   const [isModal, setModal] = useState(false);

//   const companies = personLists.map(pl => {
//     const distributions = pl.distributions.map(d => (
//       <CompanyDistribution key={d.id} id={d.id} personList={pl.persons} />
//     ))
//     return (
//       <section key={pl.id} id={pl.id}>
//         {distributions}
//         <button onClick={() => addDistribution(pl.id)}>New distribution</button>
//       </section>
//     );
//   });

//   function addPersonsList(pl) {
//     setPersonLists([...personLists, { id: nanoid(), persons: pl, distributions: [] }])
//   }

//   function addDistribution(id) {
//     setPersonLists(personLists.map(pl => pl.id !== id
//       ? pl
//       : {...pl, distributions: [...pl.distributions, { id: nanoid() }]}
//     ))
//   }

//   return (
//     <main>
//       {personLists.length === 0
//         ? <p>
//           Click the button to start
//         </p>
//         : companies}
//       <button onClick={() => setModal(true)}>New company</button>
//       <ModalDistributionCreator 
//         isOpen={isModal} 
//         setOpen={setModal}
//         onConfirm={addPersonsList}
//       />
//     </main>
//   )
// }

// export function Main() {
//   return (
//     <GiftOption />
//   )
// }