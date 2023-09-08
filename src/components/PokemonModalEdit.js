import Box from "@mui/material/Box";
import { FormProvider, FTextField } from "./form";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { alpha, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { editPokemon } from "../features/pokemons/pokemonSlice";
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

export default function PokemonModalEdit({ open, setOpen, pokemon }) {
  const defaultValues = {
    name: "",
    url: "",
    type1: "",
    type2: "",
    description: "",
    height: "",
    weight: "",
    category: "",
    abilities: "",
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
    const {
      name,
      url,
      type1,
      type2,
      description,
      height,
      weight,
      category,
      abilities,
    } = data;
    const newType1 = type1 ? type1 : pokemon?.types[0];
    const newType2 = type2 ? type2 : pokemon?.types[1];
    dispatch(
      editPokemon({
        name,
        id: pokemon?.id,
        imgUrl: url,
        types: newType2 ? [newType1, newType2] : [newType1],
        description,
        height,
        weight,
        category,
        abilities,
      })
    ).then(() => reset());
    navigate(`/pokemons/${pokemon?.id}`);

    // handleClose();
    // setTimeout(() => {
    //   navigate(`/pokemons/${pokemon?.id}`);
    // }, 3000);
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
                    name="name"
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
                    name="url"
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
                    name="type1"
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
                    name="type2"
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
                    name="description"
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
                    name="height"
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
                    name="weight"
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
                    name="category"
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
                    name="abilities"
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
