<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

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
        ], Response::HTTP_OK);
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
        ], Response::HTTP_CREATED);
    }

    /**
     * Return an error response with custom status code.
     */
    protected function responseError(string $message, int $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR, $errors = null): JsonResponse
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
    protected function responseNotFound(string $message = 'Data tidak ditemukan'): JsonResponse
    {
        return $this->responseError($message, Response::HTTP_NOT_FOUND);
    }

    /**
     * Return a not found response (422 Unprocess Equest).
     */
    protected function validationError($data): JsonResponse
    {
        return $this->responseError("Kesalahan Request", Response::HTTP_UNPROCESSABLE_ENTITY, $data);
    }

    /**
     * Return an unauthorized response (401 Unauthorized).
     */
    protected function responseUnauthorized(string $message = 'Unauthorized access'): JsonResponse
    {
        return $this->responseError($message, Response::HTTP_UNAUTHORIZED);
    }
}
