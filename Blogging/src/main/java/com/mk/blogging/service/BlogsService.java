package com.mk.blogging.service;

import java.util.List;

import com.mk.blogging.dto.BlogsDto;
import com.mk.blogging.model.Blogs;

public interface BlogsService {
	
	public BlogsDto createBlog(BlogsDto blogsDto);
	
	public List<Blogs> getAllBlogPosts();
	
	public BlogsDto FindById (Long id);
	
	public void deleteBlogById (Long id);
	
	public BlogsDto updateBlogsPost(Long id, BlogsDto blogsDto);

}
