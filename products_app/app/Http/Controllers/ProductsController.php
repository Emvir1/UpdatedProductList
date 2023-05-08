<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    protected $id;
    
    public function index()
    {
        $products = Product::where('user_id', auth()->user()->id)->get();
        
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }
    public function create()
    {
        return Inertia::render('Products/CreateProduct');
    }

    public function store(Request $request)
    {
        Product::query()->create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->back()->with('success', 'Product created successfully!');
    }

    public function edit($id)
    {
        $products = Product::find($id);
        return Inertia::render('Products/UpdateProduct', [
            'products' => $products
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        
        $product ->name = $request->input('name');
        $product ->description = $request->input('description');
        $product ->price = $request->input('price');
        $product->save();
        return redirect()->intended('/products')->with('success', 'Product updated successfully!');

    }

    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ],200);
    }
}