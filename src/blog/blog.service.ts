import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateBlogDto from './dto/createBlog.dto';
import EditBlogdto from './dto/editBlog.dto';
import { Blog } from './entity/blog.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private blogRepository: Repository<Blog>,
    ) { }

    async getAllBlog() {
        return await this.blogRepository.find()
    }

    async getBlogById(id: number) {
        const blog = await this.blogRepository.findOneBy({ id })
        return blog
    }

    async adminEditBlog(id: number, editBlogdto: EditBlogdto) {
        const blog = await this.blogRepository.findOneBy({ id: id })
        blog.image = editBlogdto.image;
        blog.title = editBlogdto.title;
        blog.content = editBlogdto.content;
        blog.littlecontent = editBlogdto.littlecontent;
        return await this.blogRepository.save(blog);
    }

    async adminDeleteblog(id: number) {
        await this.blogRepository.delete(id)
    }

    async adminCreateBlog(createBlogDto: CreateBlogDto) {
        await this.blogRepository.save(createBlogDto)
    }
}
