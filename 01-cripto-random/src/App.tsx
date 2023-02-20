import { useRandom } from './hooks/useRandom';
import './App.css';

function App() {
  const query = useRandom();

  return (
    <div className='App App-header'>
      {query.isFetching ? (
        <h2>Cargando...</h2>
      ) : query.isError ? (
        <h3>{`${query.error}`}</h3>
      ) : (
        <h2>Número aleatorio: {query.data}</h2>
      )}
      <button onClick={() => query.refetch()} disabled={query.isFetching}>
        {query.isFetching ? 'Generando...' : 'Nuevo número'}
      </button>
    </div>
  );
}

export default App;
