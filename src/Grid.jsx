import React from 'react'
import Card from './Card'
import './styles/Grid.css'

export default function Grid() {
    const [pokemons, setPokemons] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
            .then(res => res.json())
            .then(res => {
                setPokemons(res.results);
                setLoading(false);
                console.log(res.results);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const selectedPokemon = pokemons.map(pokemon => {
        const id = pokemon.url.split('/')[6]
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`


        return(
          <Card
            key={pokemon.name}
            name={pokemon.name}
            img = {imgUrl}

          />
        )});

    return <main>{selectedPokemon}</main>;
}