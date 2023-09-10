import React, { useEffect, useState } from "react";
import { PageTitle } from "../components/PageTitle";
import PokeList from "../components/PokeList";
import { SearchBox } from "../components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../features/pokemons/pokemonSlice";
import PokemonModal from "../components/PokemonModal";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Fab } from "@mui/material";

export const HomePage = () => {
  const { search, page, type } = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons({ page, search, type }));
  }, [page, search, type, dispatch]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <PageTitle title="Pokedex" />
      <SearchBox />
      <PokeList />
      <PokemonModal open={open} setOpen={setOpen} />
      <Box
        sx={{
          position: "fixed",
          bottom: "3rem",
          right: "1rem",
          color: "white",
          borderRadius: "50%",
          "& > :not(style)": { m: 1 },
        }}
        onClick={handleOpen}
      >
        <Fab color="primary" aria-label="add">
          <EggIcon className="create-btn" />
        </Fab>
      </Box>
    </>
  );
};
