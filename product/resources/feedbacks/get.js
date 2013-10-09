if(this.archive){
    cancel('已经存档',200);
}
dpd.users.get(this.sender,function(data){
   this.sender=data;
});
