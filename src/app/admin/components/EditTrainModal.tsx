"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { TrainService } from "@/services/train.service";
import { ITrain } from "@/types/train.interface";
import { ICityOption } from "@/types/city.interface";
import { CityService } from "@/services/city.service";

type Props = {
  open: boolean;
  handleClose: () => void;
  refreshTrains: () => void;
  train: ITrain;
};

const EditTrainModal: React.FC<Props> = ({
  open,
  handleClose,
  refreshTrains,
  train,
}) => {
  const [fromCityOptions, setFromCityOptions] = useState<ICityOption[]>([]);
  const [toCityOptions, setToCityOptions] = useState<ICityOption[]>([]);

  useEffect(() => {
    if (train) {
      CityService.getCitiesByQuery(train.from).then((cities) => {
        setFromCityOptions(cities);
      });
  
      CityService.getCitiesByQuery(train.to).then((cities) => {
        setToCityOptions(cities);
      });
    }
  }, [train]);

  const validationSchema = Yup.object().shape({
    fromCity: Yup.string().required("Departure city is required"),
    toCity: Yup.string().required("Destination city is required"),
    departure: Yup.date().required("Departure date is required"),
    arrival: Yup.date()
      .required("Arrival date is required")
      .min(Yup.ref("departure"), "Arrival must be later than departure"),
  });

  const handleCityInputChange = async (
    setCityOptions: React.Dispatch<React.SetStateAction<ICityOption[]>>,
    value: string
  ) => {
    if (value) {
      const cities = await CityService.getCitiesByQuery(value);
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  };

  const handleEditTrain = async (
    values: {
      fromCity: string;
      toCity: string;
      departure: string;
      arrival: string;
    },
    {
      resetForm,
    }: FormikHelpers<{
      fromCity: string;
      toCity: string;
      departure: string;
      arrival: string;
    }>
  ) => {
    if (!train?.id) {
      console.error("Train ID is not defined.");
      return;
    }

    const updatedTrain: ITrain = {
      ...train,
      from: values.fromCity,
      to: values.toCity,
      departure: new Date(values.departure).toISOString(),
      arrival: new Date(values.arrival).toISOString(),
    };

    try {
      await TrainService.updateTrain(train.id.toString(), updatedTrain);
      refreshTrains();
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Error updating train:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ padding: 20, backgroundColor: "white", borderRadius: 5 }}>
        <Typography variant="h6">Edit Train</Typography>
        <Formik
          initialValues={{
            fromCity: train.from,
            toCity: train.to,
            departure: new Date(train.departure).toISOString().slice(0, 16),
            arrival: new Date(train.arrival).toISOString().slice(0, 16),
          }}
          validationSchema={validationSchema}
          onSubmit={handleEditTrain}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Autocomplete
                options={fromCityOptions}
                getOptionLabel={(option) => option.city}
                value={
                  fromCityOptions.find(
                    (option) => option.city === values.fromCity
                  ) || null
                }
                onInputChange={(event, value) => {
                  setFieldValue("fromCity", value);
                  handleCityInputChange(setFromCityOptions, value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="From"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter departure city"
                    margin="normal"
                  />
                )}
              />
              <ErrorMessage name="fromCity">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>

              <Autocomplete
                options={toCityOptions}
                getOptionLabel={(option) => option.city}
                value={
                  toCityOptions.find((option) => option.city === values.toCity) ||
                  null
                }
                onInputChange={(event, value) => {
                  setFieldValue("toCity", value);
                  handleCityInputChange(setToCityOptions, value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="To"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter destination city"
                    margin="normal"
                  />
                )}
              />
              <ErrorMessage name="toCity">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>

              <Field
                as={TextField}
                label="Departure"
                type="datetime-local"
                name="departure"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <ErrorMessage name="departure">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>

              <Field
                as={TextField}
                label="Arrival"
                type="datetime-local"
                name="arrival"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <ErrorMessage name="arrival">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditTrainModal;
