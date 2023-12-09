class UserDto{
    _id;
    phone;
    createdAt;
    activated;
    name;
    avatar;


    constructor(user){
this._id=user._id;
this.pone=user.phone;
this.activated=user.activated;
this.name=user.name;
this.avatar=user.avatar;
this.createdAt=user.createdAt;
    }
}

module.exports=UserDto;