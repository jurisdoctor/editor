import './App.css';
import { ActionToolbar } from './components/ActionToolbar/ActionToolbar/ActionToolbar';
import { Layout } from './components/Layout/Layout';
import { Pallet } from './components/Pallet/Pallet';

const App = () => {
  return (
    <div className="app">
      <div className="editor">
        <ActionToolbar />
        <div className="interface">
          <Pallet />
          <Layout />
        </div>
      </div>
    </div>
  );
}

export default App;
