import { Position } from "../models/driver.type";

export interface CollisionDetector {
    hasCollision(position: Position): boolean;
}
