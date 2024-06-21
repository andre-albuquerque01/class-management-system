<?php

namespace App\Service;

use App\Exceptions\AuthException;
use App\Http\Resources\AuthResource;

class AuthService
{

    public function login(array $data): AuthResource
    {
        try {
            if (!$token = auth()->attempt($data)) {
                // throw new AuthException("Unauthorized");
                return new AuthResource(['message' => "Unauthorized"]);
            }
            return new AuthResource(['token' => $token]);
        } catch (\Exception $e) {
            throw new AuthException($e->getMessage());
        }
    }


 
}
