if(!me){
    cancel('没有权限',401);
}
this.sender=me.id;
this.createDate=new Date().getTime();

// notify the admin 
dpd.email.post({from:'<contact@jiizhi.com>',to:'creatorkuang@gmail.com',html:this.text,text:this.text});