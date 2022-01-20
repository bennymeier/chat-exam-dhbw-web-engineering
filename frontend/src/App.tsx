import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatView from './components/ChatView';
import Sidebar from './components/Sidebar';

const App = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log('MOUNTED: ', id);
    return () => {
      console.log('UNMOUNTED: ', id);
    };
  }, [id]);

  return (
    <Sidebar>
      <ChatView />
    </Sidebar>
  );
};

export default App;
