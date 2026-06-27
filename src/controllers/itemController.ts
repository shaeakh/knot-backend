import { Request, Response, NextFunction } from 'express';
import { ItemService } from '../services/itemService';
import ResponseHandler from '@/utils/responseHandler';

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.itemService.createItem(req.body);
      return ResponseHandler.send(res, 201, {
        data: item,
        message: 'Item created successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.itemService.getAllItems();
      return ResponseHandler.send(res, 200, { data: items });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Type casting to string to resolve TypeScript error
      const id = req.params.id as string;
      const item = await this.itemService.getItemById(id);
      return ResponseHandler.send(res, 200, { data: item });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const item = await this.itemService.updateItem(id, req.body);
      return ResponseHandler.send(res, 200, {
        data: item,
        message: 'Item updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await this.itemService.deleteItem(id);
      return ResponseHandler.send(res, 200, {
        message: 'Item deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
