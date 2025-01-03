package com.crm.crm.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.crm.crm.exceptions.resources.ResourceCreationException;
import com.crm.crm.exceptions.resources.ResourceDeletionException;
import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.exceptions.resources.ResourceUpdateException;
import com.crm.crm.helpers.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ApiResponse.error(ex.getMessage(), null), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ResourceCreationException.class, ResourceUpdateException.class})
    public ResponseEntity<ApiResponse<Void>> handleBadRequest(Exception ex) {
        return new ResponseEntity<>(ApiResponse.error(ex.getMessage(), null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceDeletionException.class)
    public ResponseEntity<ApiResponse<Void>> handleResourceDeletionException(ResourceDeletionException ex) {
        return new ResponseEntity<>(ApiResponse.error(ex.getMessage(), null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception ex) {
        return new ResponseEntity<>(ApiResponse.error("An unexpected error occurred", null), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
