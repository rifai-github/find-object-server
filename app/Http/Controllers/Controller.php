<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class Controller
{
    /**
     * Return a success response (200 OK).
     */
    protected function responseSuccess(string $message, $data = null): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], 200);
    }

    /**
     * Return a created response (201 Created).
     */
    protected function responseCreated(string $message, $data = null): JsonResponse
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], 201);
    }

    /**
     * Return an error response with custom status code.
     */
    protected function responseError(string $message, int $statusCode = 400, $errors = null): JsonResponse
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors
        ], $statusCode);
    }

    /**
     * Return a not found response (404 Not Found).
     */
    protected function responseNotFound(string $message = 'Data not found'): JsonResponse
    {
        return $this->responseError($message, 404);
    }

    /**
     * Return an unauthorized response (401 Unauthorized).
     */
    protected function responseUnauthorized(string $message = 'Unauthorized access'): JsonResponse
    {
        return $this->responseError($message, 401);
    }
}
