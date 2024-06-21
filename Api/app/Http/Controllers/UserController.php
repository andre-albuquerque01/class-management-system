<?php

namespace App\Http\Controllers;

use App\Exceptions\UserException;
use App\Http\Requests\UserRequest;
use App\Service\UserService;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->middleware('auth:api', ['except' => ['store']]);
        $this->userService = $userService;
    }

    public function index()
    {
        try {
            return  $this->userService->show();
        } catch (UserException $e) {
            throw new UserException();
        }
    }

    public function store(UserRequest $request)
    {
        try {
            return $this->userService->store($request->validated());
        } catch (UserException $e) {
            throw new UserException();
        }
    }

    public function update(UserRequest $request)
    {
        try {
            return $this->userService->update($request->validated());
        } catch (UserException $e) {
            throw new UserException();
        }
    }

    public function show()
    {
        try {
            return  $this->userService->show();
        } catch (UserException $e) {
            throw new UserException();
        }
    }
    public function destroy()
    {
        try {
            return $this->userService->destroy();
        } catch (UserException $e) {
            throw new UserException();
        }
    }
}
