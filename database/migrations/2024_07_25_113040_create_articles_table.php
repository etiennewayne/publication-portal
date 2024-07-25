<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id('article_id');
            $table->string('title')->nullable();
            $table->text('article_content')->nullable();
            $table->string('author')->nullable();
            $table->string('encoded_by')->nullable();
            $table->string('modified_by')->nullable();
            $table->dateTime('date_published')->nullable();
            $table->tinyInteger('is_published')->default(0);
            $table->tinyInteger('is_featured')->default(0);
            $table->integer('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
