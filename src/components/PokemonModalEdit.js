import Box from "@mui/material/Box";
import { FormProvider, FTextField } from "./form";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { alpha, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { editPokemon, getPokemonById } from "../features/pokemons/pokemonSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PokemonModalEdit({ open, setOpen, id }) {
  const { pokemon } = useSelector((state) => state.pokemons.pokemon);
  const defaultValues = {
    newName: "",
    newUrl: "",
    newType1: "",
    newType2: "",
    newDescription: "",
    newHeight: "",
    newWeight: "",
    newCategory: "",
    newAbilities: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    let {
      newName,
      newUrl,
      newType1,
      newType2,
      newDescription,
      newHeight,
      newWeight,
      newCategory,
      newAbilities,
    } = data;
    newType1 = newType1 ? newType1 : pokemon?.types[0];
    newType2 = newType2 ? newType2 : pokemon?.types[1];
    dispatch(
      editPokemon({
        name: newName ? newName : pokemon?.name,
        id: id,
        imgUrl: newUrl ? newUrl : pokemon?.url,
        types: newType2 ? [newType1, newType2] : [newType1],
        description: newDescription ? newDescription : pokemon?.description,
        height: newHeight ? newHeight : pokemon?.height,
        weight: newWeight ? newWeight : pokemon?.weight,
        category: newCategory ? newCategory : pokemon?.category,
        abilities: newAbilities ? newAbilities : pokemon?.abilities,
      })
    ).then(() => {
      reset();
    });

    setTimeout(() => {
      handleClose();
      dispatch(getPokemonById(id));
      navigate(`/pokemons/${id}`);
    }, 3000);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Stack spacing={2}>
                  <FTextField
                    name="newName"
                    fullWidth
                    placeholder={pokemon?.name}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />

                  <FTextField
                    name="newUrl"
                    fullWidth
                    // rows={4}
                    placeholder={pokemon?.url}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                  <FTextField
                    name="newType1"
                    fullWidth
                    rows={4}
                    placeholder={pokemon?.types[0]}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />

                  <FTextField
                    name="newType2"
                    fullWidth
                    rows={4}
                    placeholder={pokemon?.types[1]}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                </Stack>
                <Stack spacing={2}>
                  <FTextField
                    name="newDescription"
                    fullWidth
                    rows={4}
                    placeholder={pokemon?.description}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                  <FTextField
                    name="newHeight"
                    fullWidth
                    rows={4}
                    placeholder={pokemon?.height}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                  <FTextField
                    name="newWeight"
                    fullWidth
                    rows={4}
                    placeholder={pokemon?.weight}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                  <FTextField
                    name="newCategory"
                    fullWidth
                    rows={4}
                    placeholder={pokemon?.category}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                  <FTextField
                    name="newAbilities"
                    fullWidth
                    rows={4}
                    placeholder={pokemon?.abilities}
                    sx={{
                      "& fieldset": {
                        borderWidth: `1px !important`,
                        borderColor: alpha("#919EAB", 0.32),
                      },
                    }}
                  />
                </Stack>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="small"
                  loading={
                    isSubmitting
                    // || isLoading
                  }
                >
                  Edit Pokemon
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
