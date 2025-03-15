
import React from 'react';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En solo tres simples pasos, estarás en camino a una sonrisa más saludable y radiante.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-dental-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-medium mb-2">Solicita una Cita</h3>
            <p className="text-gray-600">
              Programa tu primera consulta a través de nuestro sitio web o llamando directamente a nuestra clínica.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-dental-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-medium mb-2">Evaluación Completa</h3>
            <p className="text-gray-600">
              Realizamos un diagnóstico completo y creamos un plan de tratamiento personalizado para ti.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-dental-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-medium mb-2">Tratamiento y Seguimiento</h3>
            <p className="text-gray-600">
              Implementamos el tratamiento acordado y realizamos seguimientos regulares para asegurar óptimos resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
