package com.mk.blogging.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mk.blogging.dto.BlogsDto;
import com.mk.blogging.model.Blogs;
import com.mk.blogging.service.BlogsService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/blogs")
public class BlogsController {
	
	@Autowired
	private BlogsService blogsService;
	
	@PostMapping("/save")
	public ResponseEntity<BlogsDto> createBlog(@RequestBody BlogsDto blogsDto){
		BlogsDto save = blogsService.createBlog(blogsDto);
		return new ResponseEntity<BlogsDto>(save,HttpStatus.OK);
	}
	
	@GetMapping("/getAllBlogs")
	public ResponseEntity<List<Blogs>> getAllBlogPosts(){
		return ResponseEntity.ok(blogsService.getAllBlogPosts());
	}
	
	@GetMapping("/getById/{id}")
	public ResponseEntity<BlogsDto> FindById(@PathVariable Long id){
		BlogsDto data = blogsService.FindById(id);
		return new ResponseEntity<BlogsDto>(data,HttpStatus.OK);
	}
	@DeleteMapping("/deleteBlog/{id}")
	public ResponseEntity<String>  deleteBlogById(@PathVariable Long id){
		blogsService.deleteBlogById(id);
		return new ResponseEntity<String>("Data Deleted Sucessfully" + " " + "=>"+ " " + id,HttpStatus.OK);
	}
	
	@PutMapping("/updateById/{id}")
	public ResponseEntity<BlogsDto> updateBlogsPost(@PathVariable Long id, @RequestBody BlogsDto blogsDto){
		BlogsDto update = blogsService.updateBlogsPost(id,blogsDto);
		return new ResponseEntity<BlogsDto>(update,HttpStatus.CREATED);
	}

}
