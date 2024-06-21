<?php

namespace App\Service;

use App\Exceptions\UserException;
use App\Http\Resources\GeneralResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function store(array $request)
    {
        try {
            $request['password'] = Hash::make($request['password']);
            User::create($request);
            return new GeneralResource(['message' => 'success']);
        } catch (UserException $e) {
            throw new UserException();
        }
    }

    public function update(array $request)
    {
        try {
            $user = auth()->user();

            if (!$user) {
                throw new UserException("Authenticated user not found");
            }

            if (!Hash::check($request['password'], $user->password)) {
                throw new UserException("Password incorret");
            }

            $request['password'] = $user->password;
            User::where("id", $user->id)->update($request);
            return new GeneralResource(['message' => 'success']);
        } catch (UserException $e) {
            throw new UserException();
        }
    }

    public function show()
    {
        try {
            return new UserResource(auth()->user());
        } catch (UserException $e) {
            throw new UserException();
        }
    }
    public function destroy()
    {
        try {
            $user = auth()->user()->id;
            if ($user) {
                $record = User::where("id", $user)->whereNull("deleted_at")->first();
                if (!$record) {
                    throw new UserException("Already delete");
                }
                $record->touch('deleted_at');
                return new GeneralResource(["message" => "success"]);
            } else {
                throw new UserException("Authenticated user not found");
            }
        } catch (UserException $e) {
            throw new UserException();
        }
    }
}
