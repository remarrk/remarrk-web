import Remark from './components/Remark';
import './styles/styles.scss';

function App() {
  return (
    <div className='App'>
      <Remark editable={true} />
      <Remark editable={false} />
    </div>
  );
}

export default App;
