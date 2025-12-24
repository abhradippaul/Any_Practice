import { Injectable } from '@nestjs/common';
import { CreateRiderCoordinatesDto } from './dto/create-rider-coordinates.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoordinate, RiderCoordinateDocument } from './schemas/rider-coordinates.schema';
import { Model } from 'mongoose';

@Injectable()
export class RiderCoordinatesService {

    constructor(@InjectModel(RiderCoordinate.name) private readonly riderCoordinateModel: Model<RiderCoordinateDocument>) { }

    async getRiderCoordinates() {
        const riderCoordinate = await this.riderCoordinateModel.find()
        return {
            message: 'Rider Coordinates fetched',
            data: riderCoordinate
        };
    }

    async createRiderCoordinate(createRiderCoordinateDto: CreateRiderCoordinatesDto) {
        const riderCoordinate = await this.riderCoordinateModel.create(createRiderCoordinateDto);
        return {
            message: 'Rider Coordinate created',
            data: riderCoordinate
        };
    }
}
