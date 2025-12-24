import { Body, Controller, Get, Post } from '@nestjs/common';
import { RiderCoordinatesService } from './rider-coordinates.service';
import { CreateRiderCoordinatesDto } from './dto/create-rider-coordinates.dto';

@Controller('rider-coordinates')
export class RiderCoordinatesController {

    constructor(private readonly riderCoordinatesService: RiderCoordinatesService) { }

    @Get()
    getRiderCoordinates() {
        return this.riderCoordinatesService.getRiderCoordinates();
    }

    @Post()
    saveRiderCoordinate(@Body() createRiderCoordinateDto: CreateRiderCoordinatesDto) {
        return this.riderCoordinatesService.createRiderCoordinate(createRiderCoordinateDto);
    }
}
