#include <emscripten.h>
#include <stdlib.h>
#include <stdio.h>

uint8_t *movement_array;

struct position
{
    float x;
    float y;
};

float ScreenWidth;
float ScreenHeight;

EM_JS(void, fillRect, (float x, float y, float width, float height), {});
EM_JS(void, clearRect, (float x, float y, float width, float height), {});

struct position player = {0, 0};

EMSCRIPTEN_KEEPALIVE
void run_frame()
{
    if (movement_array[0] == 1)
    {
        player.x -= 10;
    }

    if (movement_array[1] == 1)
    {
        player.x += 10;
    }

    if (movement_array[2] == 1)
    {
        player.y -= 10;
    }

    if (movement_array[3] == 1)
    {
        player.y += 10;
    }

    clearRect(0, 0, ScreenWidth, ScreenHeight);

    fillRect(player.x, player.y, 100, 100);
}

EMSCRIPTEN_KEEPALIVE
void establish_movement_array(uint8_t *ptr)
{
    movement_array = ptr;
}

EMSCRIPTEN_KEEPALIVE
void setScreenSize(float width, float height)
{
    ScreenWidth = width;
    ScreenHeight = height;
}

EMSCRIPTEN_KEEPALIVE
void *wasmmalloc(size_t n)
{
    return malloc(n);
}

EMSCRIPTEN_KEEPALIVE
void wasmfree(void *ptr)
{
    free(ptr);
}