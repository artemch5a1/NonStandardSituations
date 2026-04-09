<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'password' => 'required|string'
        ]);

        // Создаем правильный хеш для '1234' (сделайте это один раз)
        $correctHash = Hash::make('1234');
        // Выведите это в лог или на экран, затем скопируйте хеш
        \Log::info('Hash for 1234: ' . $correctHash);

        if (Hash::check($validated['password'], $correctHash)) {
            session(['teacher_logged_in' => true]);

            return response()->json([
                'success' => true,
                'message' => 'Login successful'
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Неверный пароль'
        ], 401);
    }

    public function logout()
    {
        session()->forget('teacher_logged_in');

        return response()->json([
            'success' => true,
            'message' => 'Logout successful'
        ], 200);
    }

    public function check()
    {
        return response()->json([
            'authenticated' => session()->has('teacher_logged_in')
        ]);
    }
}
