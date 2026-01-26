"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageZoomModalProps {
  isOpen: boolean
  onClose: () => void
  images: { src: string; alt: string }[]
  initialIndex?: number
  productName?: string
}

export function ImageZoomModal({ 
  isOpen, 
  onClose, 
  images, 
  initialIndex = 0,
  productName 
}: ImageZoomModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentIndex(initialIndex)
    resetZoom()
  }, [initialIndex, isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          prevImage()
          break
        case "ArrowRight":
          nextImage()
          break
        case "+":
        case "=":
          zoomIn()
          break
        case "-":
          zoomOut()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }

  const zoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1)
      if (newScale === 1) setPosition({ x: 0, y: 0 })
      return newScale
    })
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    resetZoom()
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    resetZoom()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white hover:bg-white/10 rounded-full h-10 w-10 sm:h-12 sm:w-12"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Product name */}
      {productName && (
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
          <p className="text-white/80 text-xs sm:text-sm tracking-[0.15em] uppercase">{productName}</p>
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 sm:gap-2 bg-black/50 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
          onClick={(e) => { e.stopPropagation(); zoomOut() }}
          disabled={scale <= 1}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <span className="text-white text-xs sm:text-sm min-w-[45px] sm:min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
          onClick={(e) => { e.stopPropagation(); zoomIn() }}
          disabled={scale >= 4}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <div className="w-px h-5 sm:h-6 bg-white/30 mx-1 sm:mx-2" />
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
          onClick={(e) => { e.stopPropagation(); resetZoom() }}
          aria-label="Reset zoom"
        >
          <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 rounded-full h-10 w-10 sm:h-12 sm:w-12"
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 rounded-full h-10 w-10 sm:h-12 sm:w-12"
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </>
      )}

      {/* Image container */}
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 flex items-center justify-center overflow-hidden",
          scale > 1 ? "cursor-grab" : "cursor-zoom-in",
          isDragging && "cursor-grabbing"
        )}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={scale > 1 ? resetZoom : zoomIn}
      >
        <div
          className="relative w-full h-full max-w-4xl max-h-[80vh] transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
        >
          <Image
            src={images[currentIndex]?.src || "/placeholder.svg"}
            alt={images[currentIndex]?.alt || "Product image"}
            fill
            className="object-contain select-none"
            sizes="100vw"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-14 sm:bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2 bg-black/50 rounded-lg p-1.5 sm:p-2 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); resetZoom() }}
              className={cn(
                "relative w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden transition-all duration-200",
                index === currentIndex 
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black/50" 
                  : "opacity-50 hover:opacity-100"
              )}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Instructions */}
      <p className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-white/50 text-[10px] sm:text-xs hidden sm:block">
        Scroll to zoom · Drag to pan · Double-click to reset
      </p>
    </div>
  )
}
