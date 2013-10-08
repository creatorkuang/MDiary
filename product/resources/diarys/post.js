if(!me){
    cancel('没有权限',401);
}
this.owner=me.id;
this.date=new Date().getTime();