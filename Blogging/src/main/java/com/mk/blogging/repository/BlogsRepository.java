package com.mk.blogging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mk.blogging.model.Blogs;

@Repository
public interface BlogsRepository extends JpaRepository<Blogs, Long>{

}
