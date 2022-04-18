import { CollisionDetector } from "../services/collision-detector.interface";

export class Driver {
    private direction: Direction = Directions.values()[Math.floor(Math.random() * Directions.length)];

    constructor(public position: Position, private carColor: string) {
    }

    get positionX(): number {
        return this.position.x;
    }

    get positionY(): number {
        return this.position.y;
    }

    get color(): string {
        return this.carColor;
    }

    move(limit: number, collisionDetector: CollisionDetector, ifMovedCallback: (driver: Driver, from: Position, to: Position) => void = () => {}) {
        const possibleDirections = this.direction.possibleDirections;
        let newDirection: Direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

        const currentPosition = this.position;

        const newPosition = newDirection.move(currentPosition);
        if(newPosition.isValid(limit) && !collisionDetector.hasCollision(newPosition)) {
            this.direction = newDirection;
            this.position = newPosition;

            ifMovedCallback(this, currentPosition, newPosition);
        }
    }

    
}



export class Position {

    
    private _x : number;
    public get x() : number {
        return this._x;
    }

    
    private _y : number;
    public get y() : number {
        return this._y;
    }

    
    constructor(positionX: number, positionY: number) {
        this._x = positionX;
        this._y = positionY;
    }
    
    add(x: number, y: number): Position {
        return new Position(this.x + x, this.y + y);
    }

    addX(value: number) {
        return this.add(value, 0);
    }

    addY(value: number) {
        return this.add(0, value);
    }

    isValid(limit: number): boolean {
        return this.x >= 0 && this.y >= 0 && this.x < limit && this.y < limit;
    }

    toCoordinates(): string {
        return `(${this.x},${this.y})`;
    }

}

export interface Direction {
    move(position: Position): Position;
    get possibleDirections(): Direction[];
}

export class Up implements Direction {

    move(position: Position): Position {
        return position.addY(-1);
    }
    get possibleDirections(): Direction[] {
        return [Directions.LEFT, Directions.UP_LEFT, Directions.UP, Directions.UP_RIGHT, Directions.RIGHT];
    }
}

export class Down implements Direction {
    move(position: Position): Position {
        return position.addY(1);
    }
    get possibleDirections(): Direction[] {
        return [Directions.LEFT, Directions.DOWN_LEFT, Directions.DOWN, Directions.DOWN_RIGHT, Directions.RIGHT];
    }
}

export class Left implements Direction {
    move(position: Position): Position {
        return position.addX(-1);
    }
    get possibleDirections(): Direction[] {
        return [Directions.UP, Directions.UP_LEFT, Directions.LEFT, Directions.DOWN_LEFT, Directions.DOWN];
    }
}

export class Right implements Direction {
    move(position: Position): Position {
        return position.addX(1);
    }
    get possibleDirections(): Direction[] {
        return [Directions.DOWN, Directions.DOWN_RIGHT, Directions.RIGHT, Directions.UP_RIGHT, Directions.UP];
    }
}

export class UpLeft implements Direction {
    move(position: Position): Position {
        return position.add(-1, -1);
    }
    get possibleDirections(): Direction[] {
        return [Directions.UP_RIGHT, Directions.UP, Directions.UP_LEFT, Directions.LEFT, Directions.DOWN_LEFT];
    }
}

export class UpRight implements Direction {
    move(position: Position): Position {
        return position.add(1, -1);
    }
    get possibleDirections(): Direction[] {
        return [Directions.DOWN_RIGHT, Directions.RIGHT, Directions.UP_RIGHT, Directions.UP, Directions.UP_LEFT];
    }
}

export class DownRight implements Direction {
    move(position: Position): Position {
        return position.add(1, 1);
    }
    get possibleDirections(): Direction[] {
        return [Directions.DOWN_LEFT, Directions.DOWN, Directions.DOWN_RIGHT, Directions.RIGHT, Directions.UP_RIGHT];
    }
}
export class DownLeft implements Direction {
    move(position: Position): Position {
        return position.add(-1, 1);
    }
    get possibleDirections(): Direction[] {
        return [Directions.UP_LEFT, Directions.LEFT, Directions.DOWN_LEFT, Directions.DOWN, Directions.DOWN_RIGHT];
    }
}

export class Directions {
    public static UP = new Up();
    public static UP_RIGHT = new UpRight();
    public static RIGHT = new Right();
    public static DOWN_RIGHT = new DownRight();
    public static DOWN = new Down();
    public static DOWN_LEFT = new DownLeft();
    public static LEFT = new Left();
    public static UP_LEFT = new UpLeft();

    public static values (): Direction[] {
        return [this.UP, this.UP_RIGHT, this.RIGHT, this.DOWN_RIGHT, this.DOWN, this.DOWN_LEFT, this.LEFT, this.UP_LEFT]
    }

}