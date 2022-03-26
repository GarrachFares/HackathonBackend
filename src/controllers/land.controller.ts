import type { Controller } from "../@types";
import { Land } from "../models/land";
import * as service from "../services/land.service";
import * as userService from "../services/user.service";

export const getAll: Controller = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};

export const getById: Controller = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await service.getById(id as any);
    res.json(data);
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};

export const getByMyId: Controller = async (req, res) => {
  try {
    const id = req.user.id;
    const data = await service.getByOwnerId(id as any);
    res.json(data);
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};

export const getFreeModLands: Controller = async (req, res) => {
  try {
    const data = await service.getFreeModLands();
    res.json(data);
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};

export const create: Controller = async (req, res) => {
  try {
    const { latitude, longitude, owner, moderator } = req.body;
    let land: Land = new Land();
    land.latitude = Number(latitude);
    land.longitude = Number(longitude);
    const fullOwner = await userService.getById(req.user.id);
    if (!fullOwner) {
      throw new Error("owner not found");
      return;
    }
    land.owner = fullOwner;
    const fullModerator = await userService.getById(moderator);
    if (fullModerator) {
      land.moderator = fullModerator;
    }
    //land.moderator = fullModerator

    const data = await service.create(land);
    res.json(data);
  } catch (e: any) {
    res.status(400).json(e.message);
  }
};
