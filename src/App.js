import { Component } from 'react';

import CardList from './components/card-list/card-list.comp';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: [],
      searchField: '',
    };
  }

  componentDidMount() {
    const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0';

    fetch(pokeAPI)
      .then((response) => {
        return response.json();
      }).then((results) => {
        this.setState({ pokemon: results.results });
      });
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();

    this.setState(() => { 
      return { searchField };
    });
  }

  render() {

    const { pokemon, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredPokemon = pokemon.filter((poke) => {
      return poke.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
      <div className="App">
        <h1>Pokedexer</h1>
        <input className='search-box' type='search' placeholder='Search Pokemon' 
          onChange={ onSearchChange }
        />
        
        <CardList pokemon={ filteredPokemon } />

      </div>
    );
  }
}

export default App;
