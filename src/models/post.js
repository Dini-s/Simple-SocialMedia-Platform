class Post {
    constructor(id, title, content, creator, imgeUrl = null) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.creator = creator;
        this.imgeUrl = imgeUrl;
        this.createAt = new Date();
        this.updateAt = new Date();
        this.likes = 0;
        this.comments = [];
    };

}