import React from 'react';
import ReactDOM from 'react-dom';
import { useMachine } from '@xstate/react';
import { hackerMachine } from './hackerMachine';
import './styles.css';

function App() {
  const [current, send] = useMachine(hackerMachine);
  console.log(current.context);
  return (
    <div className="App">
      {current.matches('@state/IDLE') && (
        <button onClick={() => send('CLICK')}>Get started!</button>
      )}
      {current.matches('@state/LOADING') && <h5>Loading...</h5>}
      {current.matches('@state/SUCCESS') && (
        <div>
          {current.context.posts.map(post => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </div>
      )}
      {current.matches('@state/ERROR') && (
        <div>
          <h6>There was an error!</h6>
          <button onClick={() => send('CLICK')}>Try again</button>
        </div>
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
