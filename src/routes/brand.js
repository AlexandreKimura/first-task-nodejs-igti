import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.get("/maisModelos", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    let modelsLength = data[0].models.length;
    let brandsArray = [];
    for (let brand of data) {
      if (brand.models.length > modelsLength) {
        modelsLength = brand.models.length;
      }
    }
    const brands = data
      .filter((brand) => brand.models.length === modelsLength)
      .map((brand) => brandsArray.push(brand.brand));

    if (brandsArray.length === 1) {
      return res.send(brandsArray.toString());
    } else {
      return res.send(brandsArray);
    }
  } catch (err) {}
});

router.get("/menosModelos", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    let modelsLength = data[0].models.length;
    let brandsArray = [];
    for (let brand of data) {
      if (brand.models.length < modelsLength) {
        modelsLength = brand.models.length;
      }
    }
    const brands = data
      .filter((brand) => brand.models.length === modelsLength)
      .map((brand) => {
        brandsArray.push(brand.brand);
      });

    if (brandsArray.length === 1) {
      return res.send(brandsArray.toString());
    } else {
      return res.send(brandsArray);
    }
  } catch (err) {}
});

router.get("/listaMaisModelos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(await readFile(global.filename));
    let brandsArray = [];
    let dataWithModelsLength = [];

    data.map((info) => {
      dataWithModelsLength.push({
        brand: info.brand,
        modelsLength: info.models.length,
      });
    });

    dataWithModelsLength.sort((a, b) => {
      if (a.modelsLength < b.modelsLength) {
        return -1;
      } else if (a.modelsLength > b.modelsLength) {
        return 1;
      } else {
        if (a.brand < b.brand) {
          return 1;
        } else if (a.brand > b.brand) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    const looper = dataWithModelsLength.length - 1;

    for (let i = looper; i > looper - id; i--) {
      brandsArray.push(
        `${dataWithModelsLength[i].brand} - ${dataWithModelsLength[i].modelsLength}`
      );
    }
    return res.send(brandsArray);
  } catch (err) {}
});

router.get("/listaMenosModelos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(await readFile(global.filename));
    let brandsArray = [];
    let dataWithModelsLength = [];

    data.map((info) => {
      dataWithModelsLength.push({
        brand: info.brand,
        modelsLength: info.models.length,
      });
    });

    dataWithModelsLength.sort((a, b) => {
      if (a.modelsLength < b.modelsLength) {
        return 1;
      } else if (a.modelsLength > b.modelsLength) {
        return -1;
      } else {
        if (a.brand < b.brand) {
          return 1;
        } else if (a.brand > b.brand) {
          return -1;
        } else {
          return 0;
        }
      }
    });

    const looper = dataWithModelsLength.length - 1;

    for (let i = looper; i > looper - id; i--) {
      brandsArray.push(
        `${dataWithModelsLength[i].brand} - ${dataWithModelsLength[i].modelsLength}`
      );
    }
    return res.send(brandsArray);
  } catch (err) {}
});

router.post("/listaModelos", async (req, res) => {
  let { nomeMarca } = req.body;
  nomeMarca = nomeMarca.toLowerCase();
  let modelsArray = [];

  const data = JSON.parse(await readFile(global.filename));
  const brand = data.find((info) => info.brand.toLowerCase() === nomeMarca);

  if (brand) {
    modelsArray = [...brand.models];
  }

  return res.send(modelsArray);
});

export default router;
