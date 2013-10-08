if(!me&&!internal){
    cancel('You are not authrize',401);
}
    // delete the duplicate
function getUnique(array){
  var uniqueArray = array.filter(function(elem, pos, self) {
    return self.indexOf(elem) == pos;
  });
  return uniqueArray;
}

if (!isMe(this.id)){
    // only alow the other users change the followers (follow)
    protect('email');
    protect('username');
    protect('password');
    protect('metadata');
    protect('fileId');
    protect('updateDate');
    protect('tags');

    this.followers=getUnique(this.followers);
}else{
    this.updateDate = new Date().getTime();
}
if (!isRoot) {
    // only dashboard could change the admin
    protect('admin');   
}
protect('id');
// username could not change
protect('username');
protect('createDate');
