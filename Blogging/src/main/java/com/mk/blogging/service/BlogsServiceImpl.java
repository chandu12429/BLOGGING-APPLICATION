package com.mk.blogging.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mk.blogging.dto.BlogsDto;
import com.mk.blogging.model.Blogs;
import com.mk.blogging.repository.BlogsRepository;

@Service
public class BlogsServiceImpl implements BlogsService{
	
	@Autowired
	private BlogsRepository blogsRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public BlogsDto createBlog(BlogsDto blogsDto) {
		Blogs map = modelMapper.map(blogsDto, Blogs.class);
		Blogs save = blogsRepository.save(map);
		return modelMapper.map(save, BlogsDto.class);
	}
	
	@Override
	public List<Blogs> getAllBlogPosts() {
		List<Blogs> all = blogsRepository.findAll();
		return all;
		/*
		 * System.out.println(all); 
		 * return all.stream() 
		 * .map(post -> modelMapper.map(all, BlogsDto.class)) 
		 * .collect(Collectors.toList());
		 */	
	}

	@Override
	public BlogsDto FindById(Long id) {
		Blogs blogs = blogsRepository.findById(id).get();
		return modelMapper.map(blogs, BlogsDto.class);
	}
	
	 @Override
	public void deleteBlogById(Long id) {
		blogsRepository.deleteById(id);
	}
	 
	 public BlogsDto updateBlogsPost(Long id, BlogsDto blogsDto) {
		Blogs blogs = blogsRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("Blog Not Fount"));
		blogs.setTitle(blogsDto.getTitle());
		blogs.setContent(blogsDto.getContent());
		blogs.setSummary(blogsDto.getSummary());
		blogs.setPublicationDate(blogsDto.getPublicationDate());
		Blogs save = blogsRepository.save(blogs);
		return modelMapper.map(save, BlogsDto.class);
	}
}
