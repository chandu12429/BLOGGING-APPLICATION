package com.mk.blogging.dto;

import java.sql.Date;

import lombok.Data;
@Data
public class BlogsDto {

	private Long id;
	private String title;
	private String content;
	private String summary;
	private Date publicationDate;
}
