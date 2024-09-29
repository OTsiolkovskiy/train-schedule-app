"use client";

import React, { useState } from "react";
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
};

const AddTrainModal: React.FC<Props> = ({
  open,
  handleClose,
  refreshTrains,
}) => {
  const [fromCityOptions, setFromCityOptions] = useState<ICityOption[]>([]);
  const [toCityOptions, setToCityOptions] = useState<ICityOption[]>([]);

  const validationSchema = Yup.object().shape({
    fromCity: Yup.string().required("Departure city is required"),
    toCity: Yup.string().required("Destination city is required"),
    departure: Yup.string()
    .required("Departure time is required")
    .test(
      "is-future-or-equal",
      "Departure time must be in the future or now",
      function (value) {
        const currentDateTime = new Date().toISOString();
        return value >= currentDateTime;
      }
    ),
    arrival: Yup.string()
      .required("Arrival time is required")
      .test(
        "is-greater",
        "Arrival time must be after departure time",
        function (value) {
          const { departure } = this.parent;
          return value > departure;
        }
      ),
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

  const handleAddTrain = async (
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
    const newTrain: ITrain = {
      from: values.fromCity,
      to: values.toCity,
      departure: values.departure + ":00Z",
      arrival: values.arrival + ":00Z",
    };

    try {
      await TrainService.addTrain(newTrain);
      refreshTrains();
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Error adding train:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ padding: 20, backgroundColor: "white", borderRadius: 5 }}>
        <Typography variant="h6">Add New Train</Typography>
        <Formik
          initialValues={{
            fromCity: "",
            toCity: "",
            departure: "",
            arrival: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddTrain}
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
                  toCityOptions.find(
                    (option) => option.city === values.toCity
                  ) || null
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
                Add Train
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddTrainModal;
