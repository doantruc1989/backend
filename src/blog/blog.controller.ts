import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import CreateBlogDto from './dto/createBlog.dto';
import EditBlogdto from './dto/editBlog.dto';

@Controller()
@ApiTags('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Get('blog')
    async getAllBlog() {
        return this.blogService.getAllBlog()
    }

    @Get('blog/:id')
    async getProduct(@Param('id') id: number) {
        return this.blogService.getBlogById(id)
    }

    @Put('blog/edit/:id')
    async putEdit(@Param('id') id: number, @Body() editBlogdto: EditBlogdto) {
        return this.blogService.adminEditBlog(id, editBlogdto)
    }

    @Delete('blog/delete/:id')
    async deleteBlog(@Param() id: number) {
        return this.blogService.adminDeleteblog(id)
    }

    @Post('blog/createnewblog')
    async createblog(@Body() createBlogDto: CreateBlogDto) {
        return this.blogService.adminCreateBlog(createBlogDto)
    }
}
