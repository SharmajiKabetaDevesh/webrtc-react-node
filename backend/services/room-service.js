const roomModel =require("../models/room-model")
class RoomService{
    async create(payload){

    const{topic,roomType,ownerId}=payload;
    const room=await roomModel.create({
        topic,
        roomType,
        ownerId,
        speakers:[ownerId],
    })

    }
    async getAllRooms(type){
const rooms = await roomModel.find({roomType:{$in:type}})
.populate('speakers').populate('ownerId').exec();
return rooms;

    }


    async getRoom(roomId){
        const room=await roomModel.findOne({_id:roomId});
        return res.json( {room});
    }
}


module.exports=new RoomService();