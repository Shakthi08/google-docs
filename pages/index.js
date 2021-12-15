import Icon  from '@material-tailwind/react/Icon'
import Head from 'next/Head'
import { useHistory }  from 'next/dist/client/router'
import Button from '@material-tailwind/react/Button'
import Header from '../components/Header'
import Image  from 'next/image'
import Neck from '../components/Neck'
import Body from '../components/Body';
import Login from '../components/Login'
import {useState} from 'react';
import { getSession, useSession } from "next-auth/client"
import Modal from '@material-tailwind/react/Modal'
import ModalBody from '@material-tailwind/react/ModalBody'
import ModalFooter from '@material-tailwind/react/ModalFooter'
import {db} from '../firebase';
import firebase from 'firebase';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
import DocumentRow from '../components/DocumentRow'
// import createHistory from 'history/createBrowserHistory'

export default function Home() {

  const [session] = useSession();

  if(!session) return <Login />;

  // const history = useHistory();

  const [snapshot] = useCollectionOnce(
    db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .orderBy("timeStamp", "desc")
    );
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");



  

  const createDocument = () => {
    if(!input) return;

    db.collection('userDocs').doc(session.user.email).collection('docs').add({
      fileName: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
    setShowModal(false);
    // history.go(0)
    location.reload();


  }

  const modal = (
    <Modal 
      size="sm" 
      active={showModal} 
      toggler={() => setShowModal(false)}
    >

      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="w-full outline-none"
          placeholder="Enter document name..."
          onKeyDown={(e) => e.key==="Enter" && createDocument()}
        />
      </ModalBody>

      <ModalFooter>

        <Button 
          color="blue"
          buttonType="link"
          onClick={(e) => setShowModal(false)}
          ripple="dark"
        >

          Cancel

        </Button>

        <Button
          color="blue"
          onClick={createDocument}
          ripple="light"
        >
          Create
        </Button>

      </ModalFooter>

    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Header />
      {modal}

      <section className='bg-[#f8f9fa] pb-10 px-10 '>
<div className='max-w-3xl mx-auto'>
  <div className='flex items-center justify-between py-6'>
    <h2 className='text-lg text-gray-700 '>Start a new document</h2>
    <Button
      color="gray"
      buttonType="outline"
      iconOnly={true}
      rounded={true}
      ripple="dark"
      className="border-0"
    >
      <Icon name="more_vert" size="3xl"/>
    </Button>
  </div>

  <div>
    <div onClick={() => setShowModal(true)} className='relative w-40 border-2 cursor-pointer h-52 hover:border-blue-500'>
    <Image src="https://links.papareact.com/pju"  layout='fill' />
    </div>

    <p className='mt-2 ml-2 text-sm font-semibold text-gray-700'>Blank</p>
    
  </div>

</div>
</section>

<section class="scrollbar-hide" className='px-10 bg-white md:px-0'>
        <div  className='max-w-3xl py-8 mx-auto text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='flex-grow font-medium'>My documents</h2>
            <p className='mr-12 '>Date created</p>
            <Icon name="folder" size="3xl" color="gray"/>
          </div>
        

        {snapshot?.docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            id={doc.id}
            fileName={doc.data().fileName}
            date={doc.data().timeStamp}
          />
        ))}

        </div>
      </section>
      
      


    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return{
    props:{
      session,
    },
  };
}