<?php

namespace App\Http\Controllers;

use App\Exceptions\AuthException;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\GeneralResource;
use App\Service\AuthService;

class AuthController extends Controller
{
    private $authService;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(AuthService $authService)
    {
        $this->middleware('auth:api', ['except' => ['login']]);
        $this->authService = $authService;
    }

    public function login(AuthRequest $request): AuthResource
    {
        try {
            return $this->authService->login($request->validated());
        } catch (\Exception $e) {
            throw new AuthException($e->getMessage());
        }
    }

    public function logout()
    {
        try {
            auth()->logout();
            return new GeneralResource(['message' => 'Successfully logged out']);
        } catch (\Exception $e) {
            throw new AuthException($e->getMessage());
        }
    }
}
