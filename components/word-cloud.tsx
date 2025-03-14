"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export function WordCloud() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5

    // Create a sphere of words
    const words = [
      "AI",
      "ML",
      "Neural Networks",
      "Deep Learning",
      "Data",
      "Training",
      "Models",
      "Analytics",
      "Python",
      "TensorFlow",
      "PyTorch",
      "Computer Vision",
      "NLP",
      "Optimization",
    ]

    const wordMeshes: THREE.Mesh[] = []
    const radius = 100
    const fontLoader = new FontLoader()

    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      words.forEach((word, i) => {
        const geometry = new TextGeometry(word, {
          font: font,
          size: 8,
          height: 2,
        })

        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5),
          specular: 0x111111,
          shininess: 30,
        })

        const mesh = new THREE.Mesh(geometry, material)

        // Position words in a sphere
        const phi = Math.acos(-1 + (2 * i) / words.length)
        const theta = Math.sqrt(words.length * Math.PI) * phi

        mesh.position.x = radius * Math.cos(theta) * Math.sin(phi)
        mesh.position.y = radius * Math.sin(theta) * Math.sin(phi)
        mesh.position.z = radius * Math.cos(phi)

        mesh.lookAt(new THREE.Vector3(0, 0, 0))

        scene.add(mesh)
        wordMeshes.push(mesh)
      })

      // Add lights to make the words visible
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffffff, 1)
      pointLight.position.set(0, 0, 200)
      scene.add(pointLight)
    })

    camera.position.z = 200

    // Animation
    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    function handleResize() {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="h-[500px] w-full" />
}

