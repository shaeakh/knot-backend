import { Request, Response, NextFunction } from 'express';
import { TshirtService } from '../services/tshirtService';
import ResponseHandler from '@/utils/responseHandler';

export class TshirtController {
  private tshirtService: TshirtService;

  constructor() {
    this.tshirtService = new TshirtService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tshirt = await this.tshirtService.createTshirt(req.body);
      return ResponseHandler.send(res, 201, {
        data: tshirt,
        message: 'T-shirt created successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tshirts = await this.tshirtService.getAllTshirts();
      return ResponseHandler.send(res, 200, { data: tshirts });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const tshirt = await this.tshirtService.getTshirtById(id);
      return ResponseHandler.send(res, 200, { data: tshirt });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const tshirt = await this.tshirtService.updateTshirt(id, req.body);
      return ResponseHandler.send(res, 200, {
        data: tshirt,
        message: 'T-shirt updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      await this.tshirtService.deleteTshirt(id);
      return ResponseHandler.send(res, 200, {
        message: 'T-shirt deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
