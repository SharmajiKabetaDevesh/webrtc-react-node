const RoomDto = require("../dtos/room-dto");
const roomService = require("../services/room-service");

class RoomsController{
    async create(req,res){
        const {topic,roomType}=req.body;

        if(!topic,!roomType){
            return res.status(400).json({message:"All Fields are Required"})
        }

        const room =await roomService.create({
           topic,
           roomType,
           ownerId:req.user_id
        });

        return res.json(new RoomDto(room));

    }

    async index(req,res){
        const rooms=await roomService.getAllRooms(['open']);
        const allRooms=rooms.map(room=>new RoomDto(room));
        return res.json(allRooms);
    }

    async show(req,res){
        const room=await roomService.getAllRooms(request.params.roomId);
        return room;
    }
}


module.exports=new RoomsController();